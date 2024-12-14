/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes with pagination
 *     tags: [Notes]
 *     description: Retrieve a paginated list of all notes.
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: Number of notes to return per page (default is 10).
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         description: The page number to return (default is 1).
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: 'Note Title'
 *                       content:
 *                         type: string
 *                         example: 'This is the note content.'
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-12-14T05:39:38.172Z'
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-12-14T11:38:05.448Z'
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 total:
 *                   type: integer
 *                   example: 7
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 */
