/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve a list of all events
 *     tags: [Events]
 *     description: Fetches all events from the database along with a count of the total events.
 *     responses:
 *       '200':
 *         description: Successfully retrieved all events.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 25
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Tech Conference 2024"
 *                       location:
 *                         type: string
 *                         example: "Warsaw"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-14T10:00:00Z"
 *                       description:
 *                         type: string
 *                         example: "A conference discussing the latest in tech."
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-10T08:30:00Z"
 */
