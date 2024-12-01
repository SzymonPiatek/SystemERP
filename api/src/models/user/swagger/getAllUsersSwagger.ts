/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of all users with their details.
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
 *                 count:
 *                   type: integer
 *                   description: The total number of users.
 *                   example: 1
 *                 users:
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
 *                         example: example@test.pl
 *                       firstName:
 *                         type: string
 *                         example: Testowy
 *                       lastName:
 *                         type: string
 *                         example: User
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
 *                         example: 2024-11-24T10:41:24.541Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-11-24T10:41:24.541Z
 */
