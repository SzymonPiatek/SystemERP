/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get company by ID
 *     tags: [Companies]
 *     description: Retrieve a specific company by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the company to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the company.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Company found
 *                 company:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: name
 *                     country:
 *                       type: string
 *                       example: country
 *                     voivodeship:
 *                       type: string
 *                       example: voivodeship
 *                     district:
 *                       type: string
 *                       example: district
 *                     commune:
 *                       type: string
 *                       example: commune
 *                     city:
 *                       type: string
 *                       example: city
 *                     zipCode:
 *                       type: string
 *                       example: 01-234
 *                     street:
 *                       type: string
 *                       example: street
 *                     houseNumber:
 *                       type: string
 *                       example: 12
 *                     apartmentNumber:
 *                       type: string
 *                       example: 1
 *                     nip:
 *                       type: string
 *                       example: 1234567890
 *                     regon:
 *                       type: string
 *                       example: 1234567890
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-24T10:41:24.543Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-24T10:41:24.543Z
 *       '404':
 *         description: Company not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Company not found
 */
