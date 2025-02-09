/**
 * @swagger
 * /email/preview/{name}:
 *   get:
 *     summary: Preview an email template
 *     tags: [Email]
 *     description: Retrieves the HTML preview of an email template with pre-filled test data.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the email template.
 *         example: sendResetPassword
 *     responses:
 *       '200':
 *         description: Successfully generated email preview.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html><body><h1>Password Reset Request</h1>...</body></html>"
 *       '400':
 *         description: Validation error occurred (e.g., missing template name).
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
 *                   example: 'Missing template name'
 *       '404':
 *         description: The requested email template was not found.
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
 *                   example: 'Template not found'
 *       '500':
 *         description: Internal server error occurred while rendering the template.
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
 *                   example: 'Error rendering email'
 */
