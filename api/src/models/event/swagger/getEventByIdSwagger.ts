/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Retrieve details of a specific event by its ID
 *     tags: [Events]
 *     description: Fetches details of an event using its unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the event to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Successfully retrieved the event details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Tech Conference 2024"
 *                     location:
 *                       type: string
 *                       example: "Warsaw"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-14T10:00:00Z"
 *                     description:
 *                       type: string
 *                       example: "A conference discussing the latest in tech."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-10T08:30:00Z"
 *       '404':
 *         description: Event not found.
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
 *                   example: "Event not found."
 */
