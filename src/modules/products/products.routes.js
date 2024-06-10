import Router from 'express'
import * as productController from '../products/products.controller.js'
const router = Router()

router.post('/addProduct', productController.addProduct)
router.delete('/deleteProduct/:userid/:id', productController.deleteProduct)
router.put('/updateProduct/:userid/:id', productController.updateProduct)
router.get('/listProducts', productController.listProducts)
router.get('/searchProduct', productController.searchProduct)


export default router

