/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Retrieve a list of all companies
 *     tags: [Companies]
 *     description: Get a paginated list of companies with optional filters and search capabilities.
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Filter companies by name (exact or partial match).
 *         required: false
 *         schema:
 *           type: string
 *           example: "TechCorp"
 *       - name: country
 *         in: query
 *         description: Filter companies by country (exact or partial match).
 *         required: false
 *         schema:
 *           type: string
 *           example: "Poland"
 *       - name: voivodeship
 *         in: query
 *         description: Filter companies by voivodeship (province).
 *         required: false
 *         schema:
 *           type: string
 *           example: "Mazowieckie"
 *       - name: district
 *         in: query
 *         description: Filter companies by district.
 *         required: false
 *         schema:
 *           type: string
 *           example: "Warsaw"
 *       - name: commune
 *         in: query
 *         description: Filter companies by commune.
 *         required: false
 *         schema:
 *           type: string
 *           example: "Bemowo"
 *       - name: city
 *         in: query
 *         description: Filter companies by city.
 *         required: false
 *         schema:
 *           type: string
 *           example: "Warsaw"
 *       - name: zipCode
 *         in: query
 *         description: Filter companies by zip code.
 *         required: false
 *         schema:
 *           type: string
 *           example: "00-001"
 *       - name: street
 *         in: query
 *         description: Filter companies by street.
 *         required: false
 *         schema:
 *           type: string
 *           example: "Main Street"
 *       - name: houseNumber
 *         in: query
 *         description: Filter companies by house number.
 *         required: false
 *         schema:
 *           type: string
 *           example: "123"
 *       - name: apartmentNumber
 *         in: query
 *         description: Filter companies by apartment number.
 *         required: false
 *         schema:
 *           type: string
 *           example: "4B"
 *       - name: nip
 *         in: query
 *         description: Filter companies by NIP (tax identification number).
 *         required: false
 *         schema:
 *           type: string
 *           example: "1234567890"
 *       - name: regon
 *         in: query
 *         description: Filter companies by REGON (statistical number).
 *         required: false
 *         schema:
 *           type: string
 *           example: "123456789"
 *       - name: search
 *         in: query
 *         description: Search across multiple fields (e.g., name, city, zipCode, etc.).
 *         required: false
 *         schema:
 *           type: string
 *           example: "Tech"
 *       - name: limit
 *         in: query
 *         description: Number of companies to return per page.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: page
 *         in: query
 *         description: The page number to retrieve.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
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
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 total:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "TechCorp"
 *                       country:
 *                         type: string
 *                         example: "Poland"
 *                       voivodeship:
 *                         type: string
 *                         example: "Mazowieckie"
 *                       district:
 *                         type: string
 *                         example: "Warsaw"
 *                       commune:
 *                         type: string
 *                         example: "Bemowo"
 *                       city:
 *                         type: string
 *                         example: "Warsaw"
 *                       zipCode:
 *                         type: string
 *                         example: "00-001"
 *                       street:
 *                         type: string
 *                         example: "Main Street"
 *                       houseNumber:
 *                         type: string
 *                         example: "123"
 *                       apartmentNumber:
 *                         type: string
 *                         example: "4B"
 *                       nip:
 *                         type: string
 *                         example: "1234567890"
 *                       regon:
 *                         type: string
 *                         example: "123456789"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-14T10:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-14T10:00:00Z"
 *       '400':
 *         description: Bad request. Validation error in query parameters.
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
 *                   example: "Invalid query parameters."
 */
