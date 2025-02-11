/**
 * @swagger
 * /users/accept_invite:
 *   post:
 *     summary: Accept user invitation
 *     tags: [Users]
 *     description: Allows a user to accept an invitation by providing a valid token and setting a new password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "a1b2c3d4e5f6g7h8i9j0"
 *                 description: The invitation token received via email.
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: "NewSecurePassword123!"
 *                 description: The new password the user wants to set.
 *     responses:
 *       '200':
 *         description: Account successfully activated.
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
 *                   example: "Account activated"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "johndoe@example.com"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     companyId:
 *                       type: integer
 *                       nullable: true
 *                       example: 1
 *       '400':
 *         description: Invalid or expired token, missing password, or password too short.
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
 *                   example: "Invalid or expired token"
 *       '500':
 *         description: Internal server error while activating the account.
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
