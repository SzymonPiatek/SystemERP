/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Creates a new user account with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (minimum 8 characters).
 *                 example: strongPassword!123
 *               firstName:
 *                 type: string
 *                 description: User's first name.
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: User's last name.
 *                 example: Doe
 *               isActive:
 *                 type: boolean
 *                 description: Whether the user is active.
 *                 example: true
 *               companyId:
 *                 type: integer
 *                 nullable: true
 *                 description: ID of the company the user belongs to.
 *                 example: 1
 *               roleId:
 *                 type: integer
 *                 description: Role ID assigned to the user.
 *                 example: 2
 *     responses:
 *       '201':
 *         description: User created successfully.
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
 *                   example: User created
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *                     companyId:
 *                       type: integer
 *                       nullable: true
 *                     createdAt:
 *                       type: date-time
 *                     updatedAt:
 *                       type: date-time
 *                     profile:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         profilePicPath:
 *                           type: string
 *                         roleId:
 *                           type: integer
 *                         userId:
 *                           type: integer
 *                         createdAt:
 *                           type: date-time
 *                         updatedAt:
 *                           type: date-time
 */
