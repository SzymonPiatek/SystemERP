/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     description: Retrieve a list of all companies with their details.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 companies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: name
 *                       country:
 *                         type: string
 *                         example: country
 *                       voivodeship:
 *                         type: string
 *                         example: voivodeship
 *                       district:
 *                         type: string
 *                         example: district
 *                       commune:
 *                         type: string
 *                         example: commune
 *                       city:
 *                         type: string
 *                         example: city
 *                       zipCode:
 *                         type: string
 *                         example: 01-234
 *                       street:
 *                         type: string
 *                         example: street
 *                       houseNumber:
 *                         type: string
 *                         example: 12
 *                       apartmentNumber:
 *                         type: string
 *                         example: 1
 *                       nip:
 *                         type: string
 *                         example: 1234567890
 *                       regon:
 *                         type: string
 *                         example: 1234567890
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-11-24T10:41:24.543Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-11-24T10:41:24.543Z
 */
