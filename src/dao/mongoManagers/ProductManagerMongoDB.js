import productModel from "../models/product.model.js";
export class ProductManagerMongoDB {
  constructor(path) {
    this.products = []
  }

  async addProduct(title, description, price, thumbnails, code, stock/* , status, category */) {
    try {
      // Verificar que no exista otro producto con el mismo código
      const existingProduct = await productModel.findOne({ code })
      if (existingProduct) {
        throw new Error(`El código "${code}" ya está en uso`)
      }

      // Crear un nuevo producto con los datos recibidos
      const product = new productModel({
        id: null, // El id se autogenera en la base de datos
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
/*         status,
        category, */
      })

      // Guardar el nuevo producto en la base de datos
      await product.save()

    } catch (error) {
      console.error(error)
    }
  }

  async getProducts({ limit = 10, page = 1, query, sort }) {
    try {
      const filter = {};
      if (query) {
        filter.category = query;
      }
      
      const sortOptions = {};
      if (sort === "asc") {
        sortOptions.price = 1;
      } else if (sort === "desc") {
        sortOptions.price = -1;
      }
  
      const options = {
        page: page,
        limit: limit,
        sort: sortOptions,
        lean:true
      };
  
      const products = await productModel.paginate(filter, options)
      const totalPages = products.totalPages
      const prevPage = products.hasPrevPage ? products.prevPage : null
      const nextPage = products.hasNextPage ? products.nextPage : null
      const pageObj = {
        status: "success",
        payload: products.docs,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/views/products?page=${prevPage}&limit=${limit}` : null,
        nextLink: products.hasNextPage ? `/views/products?page=${nextPage}&limit=${limit}` : null
      }
      return pageObj
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: error.message
      };
    }
  }

  async getProductById(id) {
    try {
      // Buscar un producto por su id
      const product = await productModel.findOne({ _id:id }).lean().exec()
      if (product) {
        return product
      } else {
        return "Not found"
      }
    } catch (error) {
      console.error(error)
    }
  }

  async updateProduct(id, fieldsToUpdate) {
    try {
      // Actualizar un producto por su id
      const product = await productModel.findOneAndUpdate(
        { _id: id },
        { $set: fieldsToUpdate },
        { new: true } // Retorna el documento actualizado en lugar del anterior
      )

      if (product) {
        return "El objeto se ha actualizado correctamente."
      } else {
        return "No se ha encontrado un objeto con el id especificado."
      }
    } catch (error) {
      console.error(error)
    }
  }

  async deleteProduct(id) {
    return productModel.deleteOne({_id: id })
      .then((result) => {
        if (result.deletedCount === 1) {
          return "El objeto se ha eliminado correctamente.";
        } else {
          return "No se ha encontrado un objeto con el id especificado.";
        }
      })
      .catch((err) => {
        console.error(err);
        return "Error al eliminar el objeto.";
      });
  }
  
  
}
