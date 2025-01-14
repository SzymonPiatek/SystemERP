/**
 * @swagger
 * /companies/{id}:
 *   patch:
 *     summary: Update company data
 *     tags: [Companies]
 *     description: Edit details of an existing company by ID. Ensures that the company name is unique.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the company to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Company Name
 *               country:
 *                 type: string
 *                 example: Updated Country
 *               voivodeship:
 *                 type: string
 *                 example: Updated Voivodeship
 *               district:
 *                 type: string
 *                 example: Updated District
 *               commune:
 *                 type: string
 *                 example: Updated Commune
 *               city:
 *                 type: string
 *                 example: Updated City
 *               zipCode:
 *                 type: string
 *                 example: 00-123
 *               street:
 *                 type: string
 *                 example: Updated Street
 *               houseNumber:
 *                 type: string
 *                 example: 10
 *               apartmentNumber:
 *                 type: string
 *                 example: 5
 *               nip:
 *                 type: string
 *                 example: 1234567890
 *               regon:
 *                 type: string
 *                 example: 9876543210
 *     responses:
 *       '200':
 *         description: Successfully updated the company.
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
 *                   example: Company updated successfully
 *                 company:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Updated Company Name
 *                     country:
 *                       type: string
 *                       example: Updated Country
 *                     voivodeship:
 *                       type: string
 *                       example: Updated Voivodeship
 *                     district:
 *                       type: string
 *                       example: Updated District
 *                     commune:
 *                       type: string
 *                       example: Updated Commune
 *                     city:
 *                       type: string
 *                       example: Updated City
 *                     zipCode:
 *                       type: string
 *                       example: 00-123
 *                     street:
 *                       type: string
 *                       example: Updated Street
 *                     houseNumber:
 *                       type: string
 *                       example: 10
 *                     apartmentNumber:
 *                       type: string
 *                       example: 5
 *                     nip:
 *                       type: string
 *                       example: 1234567890
 *                     regon:
 *                       type: string
 *                       example: 9876543210
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-24T10:41:24.543Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-01T12:34:56.789Z
 *       '400':
 *         description: Company with the same name already exists.
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
 *                   example: A company with this name already exists
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
