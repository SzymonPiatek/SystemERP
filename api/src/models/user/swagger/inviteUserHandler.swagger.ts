/**
 * @swagger
 * /users/invite:
 *   post:
 *     summary: Invite a new user
 *     tags: [Users]
 *     description: Allows an admin to invite a new user to the system by sending an email invitation.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *                 description: The first name of the user being invited.
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *                 description: The last name of the user being invited.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *                 description: The email address of the user being invited.
 *               companyId:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *                 description: The ID of the company the user is being invited to (optional).
 *               roleId:
 *                 type: integer
 *                 example: 2
 *                 description: The role ID assigned to the user.
 *     responses:
 *       '201':
 *         description: Invitation successfully sent.
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
 *                   example: "Invitation sent"
 *       '400':
 *         description: Bad request due to missing fields, duplicate email, or existing invite.
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
 *                   example: "Email already exists"
 *       '403':
 *         description: Unauthorized access (only admin can invite users).
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
 *                   example: "Access denied"
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
 *                   example: "Company not found"
 *       '500':
 *         description: Internal server error while creating the invitation.
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
 *                   example: "Internal Server Error"
 */
