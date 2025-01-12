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
 *
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
 *                     title:
 *                       type: string
 *                       example: "Tech Conference 2024"
 *                     description:
 *                       type: string
 *                       example: "A conference discussing the latest in tech."
 *                     isAllDay:
 *                       type: boolean
 *                       example: false
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-14T10:00:00Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-14T18:00:00Z"
 *                     ownerId:
 *                       type: integer
 *                       example: 42
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
 *
 * /notes/{id}:
 *   patch:
 *     summary: Edit a specific note by its ID
 *     tags: [Notes]
 *     description: Updates the fields of a specific note belonging to the authenticated user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the note to edit
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title of the note
 *                 example: "Meeting Notes"
 *               description:
 *                 type: string
 *                 description: New description of the note
 *                 example: "Discuss project timeline and deliverables."
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Updated date for the note
 *                 example: "2024-06-14T10:00:00Z"
 *     responses:
 *       '200':
 *         description: Successfully updated the note.
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
 *                   example: "Note updated successfully."
 *                 note:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Meeting Notes"
 *                     description:
 *                       type: string
 *                       example: "Discuss project timeline and deliverables."
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-14T10:00:00Z"
 *                     ownerId:
 *                       type: integer
 *                       example: 42
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-10T08:30:00Z"
 *       '400':
 *         description: Bad request. Validation error in request body or parameters.
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
 *                   example: "Invalid request parameters or body."
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
 *                   example: "Note not found."
 */
