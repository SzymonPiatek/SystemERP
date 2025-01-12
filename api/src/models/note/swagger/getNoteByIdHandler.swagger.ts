/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     description: Retrieve a specific note by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the note to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved the note.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 note:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: 'Note Title'
 *                     content:
 *                       type: string
 *                       example: 'This is the note content.'
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-12-14T05:39:38.172Z'
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: '2024-12-14T11:38:05.448Z'
 *       '404':
 *         description: Note not found.
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
 *                   example: 'Not Found'
 */
