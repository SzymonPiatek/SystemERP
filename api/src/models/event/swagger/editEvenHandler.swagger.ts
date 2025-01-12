/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update an existing event
 *     tags: [Events]
 *     description: Updates the details of an existing event based on its ID. Allows partial updates with only the fields specified in the request body.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the event to update
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
 *                 example: "Updated Event Title"
 *               description:
 *                 type: string
 *                 example: "Event desc"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-14T10:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-14T12:00:00Z"
 *               isAllDay:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       '200':
 *         description: Event updated successfully.
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
 *                   example: "Event updated successfully"
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Updated Event Title"
 *                     description:
 *                       type: string
 *                       example: "Event desc"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-14T10:00:00Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-14T12:00:00Z"
 *                     isAllDay:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-10T08:30:00Z"
 *       '400':
 *         description: Invalid input or empty request body.
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
 *                   example: "Request body cannot be empty"
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
 *                   example: "Event not found"
 */
