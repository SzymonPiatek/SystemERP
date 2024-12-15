/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     description: Adds a new company to the database with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the company.
 *                 example: name
 *               country:
 *                 type: string
 *                 description: The country where the company is located.
 *                 example: country
 *               voivodeship:
 *                 type: string
 *                 description: The voivodeship where the company is located.
 *                 example: voivodeship
 *               district:
 *                 type: string
 *                 description: The district where the company is located.
 *                 example: district
 *               commune:
 *                 type: string
 *                 description: The commune where the company is located.
 *                 example: commune
 *               city:
 *                 type: string
 *                 description: The city where the company is located.
 *                 example: city
 *               zipCode:
 *                 type: string
 *                 description: The zip code of the company location.
 *                 example: 01-234
 *               street:
 *                 type: string
 *                 description: The street where the company is located.
 *                 example: street
 *               houseNumber:
 *                 type: string
 *                 description: The house number of the company location.
 *                 example: 12
 *               apartmentNumber:
 *                 type: string
 *                 description: The apartment number of the company location.
 *                 example: 1
 *               nip:
 *                 type: string
 *                 description: The company's NIP number.
 *                 example: 1234567890
 *               regon:
 *                 type: string
 *                 description: The company's REGON number.
 *                 example: 1234567890
 *     responses:
 *       '201':
 *         description: Company successfully created.
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
 *                   example: Company created
 *                 company:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
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
 *                       example: 2024-11-24T11:08:13.069Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-24T11:08:13.069Z
 */
