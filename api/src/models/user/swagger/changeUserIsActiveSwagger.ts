/**
 * @swagger
 * /users/{id}/status:
 *   patch:
 *     summary: Toggle the active status of a user
 *     tags: [Users]
 *     description: Activates or deactivates a user by toggling their `isActive` status.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose active status is to be toggled.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: User status updated successfully.
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
 *                   example: User activated successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: john.doe@example.com
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     companyId:
 *                       type: number
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-24T10:41:24.541Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-24T10:41:24.541Z
 *       '404':
 *         description: User not found.
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
 *                   example: User not found
 */
