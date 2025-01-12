/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve a list of all events for the authenticated user
 *     tags: [Events]
 *     description: Fetches all events owned by the authenticated user from the database along with a count of the total events.
 *     responses:
 *       '200':
 *         description: Successfully retrieved all events for the user.
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
 *                       title:
 *                         type: string
 *                         example: "Tech Conference 2024"
 *                       description:
 *                         type: string
 *                         example: "A conference discussing the latest in tech."
 *                       isAllDay:
 *                         type: boolean
 *                         example: false
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-14T10:00:00Z"
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-14T18:00:00Z"
 *                       ownerId:
 *                         type: integer
 *                         example: 42
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-10T08:30:00Z"
 *       '400':
 *         description: Bad request. Authentication error or validation issue.
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
 *                   example: "Authentication failed or invalid query parameters."
 */
