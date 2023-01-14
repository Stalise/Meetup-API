/**
 *@swagger
 *  /meetups/{id}:
 *    delete:
 *      summary: Delete meetup by id
 *      parameters:
 *        - in: path
 *          description: The meetup id
 *          required: true
 *          name: id
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The meetup was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message: string
 *                example:
 *                  message: Meetup was successfully deleted!
 *        400:
 *          $ref: '#/components/responses/Validation'
 *        404:
 *          $ref: '#/components/responses/MeetupNotFound'
 *        500:
 *          $ref: '#/components/responses/UnexpectedError'
 */
