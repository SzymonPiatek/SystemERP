/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     description: Create a new note with a given title, description, date, and ownerId.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - ownerId
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Meeting Notes'
 *               description:
 *                 type: string
 *                 example: 'Discussed project progress and next steps.'
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: '2024-12-14T10:00:00Z'
 *               ownerId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Note created successfully.
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
 *                   example: 'Note created'
 *                 note:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: 'Meeting Notes'
 *                     description:
 *                       type: string
 *                       example: 'Discussed project progress and next steps.'
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-12-14T10:00:00Z'
 *                     ownerId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-12-14T10:00:00Z'
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-12-14T10:00:00Z'
 *       '400':
 *         description: Bad request. Validation error.
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
 *                   example: 'Title is required.'
 *       '404':
 *         description: Owner not found.
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
 *                   example: 'Owner not found'
 */
