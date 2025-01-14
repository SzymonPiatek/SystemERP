/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     description: Logs out the user by clearing access and refresh tokens.
 *     responses:
 *       '200':
 *         description: Logout successful.
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
 *                   example: Logout successful
 */
