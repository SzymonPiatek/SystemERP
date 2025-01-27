/**
 * @swagger
 * /users/{id}/profile_pic:
 *   patch:
 *     summary: Update a user's profile picture
 *     tags: [Users]
 *     description: Upload and update the user's profile picture. If the user already has a profile picture, the old one will be deleted.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose profile picture is to be updated.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The new profile picture to upload.
 *     responses:
 *       '200':
 *         description: Profile picture updated successfully.
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
 *                   example: Profile picture updated successfully
 *                 profile:
 *                   type: object
 *                   description: Updated profile data.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     profilePic:
 *                       type: object
 *                       properties:
 *                         filePath:
 *                           type: string
 *                           example: /uploads/new-profile-picture.jpg
 *                         fileName:
 *                           type: string
 *                           example: new-profile-picture.jpg
 *                         fileType:
 *                           type: string
 *                           example: image/jpeg
 *       '400':
 *         description: No file uploaded.
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
 *                   example: No file uploaded
 *       '404':
 *         description: Profile not found.
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
 *                   example: Profile not found
 *       '500':
 *         description: Internal server error.
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
 *                   example: An error occurred
 */
