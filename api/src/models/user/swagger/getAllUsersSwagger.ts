/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users with their details, including pagination support and optional filtering.
 *     parameters:
 *       - in: query
 *         name: email
 *         description: Filter by email address.
 *         schema:
 *           type: string
 *       - in: query
 *         name: firstName
 *         description: Filter by user's first name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         description: Filter by user's last name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         description: Filter by active status (true or false).
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: companyId
 *         description: Filter by company ID (optional).
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         description: Search by multiple fields (email, firstName, lastName).
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Number of users to return per page (default is 10).
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         description: The page number to return (default is 1).
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: "admin@test.pl"
 *                       firstName:
 *                         type: string
 *                         example: "Testowy"
 *                       lastName:
 *                         type: string
 *                         example: "Admin"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       companyId:
 *                         type: integer
 *                         nullable: true
 *                         example: null
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-14T05:39:38.172Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-14T11:38:05.448Z"
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 total:
 *                   type: integer
 *                   example: 7
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *       '400':
 *         description: Invalid query parameters or request format.
 *       '500':
 *         description: Internal server error.
 */
