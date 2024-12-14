/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     description: Creates a new event with the specified details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startDate
 *               - endDate
 *               - ownerId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the event.
 *                 example: "Team Meeting"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: The start date and time of the event.
 *                 example: "2024-12-15T10:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: The end date and time of the event. Must be greater than or equal to `startDate`.
 *                 example: "2024-12-15T12:00:00Z"
 *               ownerId:
 *                 type: integer
 *                 description: ID of the event owner.
 *                 example: 3
 *               isAllDay:
 *                 type: boolean
 *                 description: Indicates whether the event lasts all day.
 *                 example: false
 *     responses:
 *       '201':
 *         description: Event created successfully.
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
 *                   example: "Event created"
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Team Meeting"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-15T10:00:00Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-15T12:00:00Z"
 *                     isAllDay:
 *                       type: boolean
 *                       example: false
 *                     ownerId:
 *                       type: integer
 *                       example: 3
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T10:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-01T10:00:00Z"
 *       '400':
 *         description: Invalid input data.
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
 *                   example: "Validation error: 'endDate' must be greater than or equal to 'startDate'"
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
 *                   example: "Owner not found"
 */
