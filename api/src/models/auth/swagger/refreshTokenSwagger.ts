/**
 * @swagger
 * /auth/token/refresh:
 *   post:
 *     summary: Refresh access tokens
 *     tags: [Authentication]
 *     description: Refreshes the access token using a valid refresh token and access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token required for refreshing the access token.
 *               accessToken:
 *                 type: string
 *                 description: The current (expired or valid) access token.
 *             required:
 *               - refreshToken
 *               - accessToken
 *     responses:
 *       '200':
 *         description: Tokens successfully refreshed.
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
 *                   example: Tokens refreshed
 *       '400':
 *         description: Missing required tokens in the request.
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
 *                   example: Tokens required
 *       '401':
 *         description: Failed to refresh the access token.
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
 *                   example: Failed to refresh access token
 */
