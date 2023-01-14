/**
 *@swagger
 *  /meetups/{id}:
 *    get:
 *      summary: Returns meetup by id
 *      parameters:
 *        - in: path
 *          description: The meetup id
 *          required: true
 *          name: id
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The meetup
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Meetup'
 *        400:
 *          $ref: '#/components/responses/Validation'
 *        404:
 *          $ref: '#/components/responses/MeetupNotFound'
 *        500:
 *          $ref: '#/components/responses/UnexpectedError'
 */
