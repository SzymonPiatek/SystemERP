/**
 * @swagger
 * /api/v1/email:
 *   post:
 *     summary: Send an email
 *     tags: [Email]
 *     description: Sends an email with the specified recipient, subject, and content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 description: The recipient's email address.
 *                 example: recipient@example.com
 *               subject:
 *                 type: string
 *                 description: The subject of the email.
 *                 example: Welcome to our service!
 *               text:
 *                 type: string
 *                 description: The body of the email.
 *                 example: Thank you for signing up to our service.
 *     responses:
 *       '200':
 *         description: Email was sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email was sent
 *                 email:
 *                   type: object
 *                   properties:
 *                     accepted:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of email addresses that accepted the message.
 *                       example: ["recipient@example.com"]
 *                     messageId:
 *                       type: string
 *                       description: The ID of the sent email message.
 *                       example: "<1234567890abcdef@example.com>"
 *       '400':
 *         description: Validation error occurred (e.g., missing or invalid input).
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
 *                   example: '"to" is required'
 */
