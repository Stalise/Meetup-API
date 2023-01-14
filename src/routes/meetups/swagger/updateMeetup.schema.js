/**
 *@swagger
 *  /meetups:
 *    patch:
 *      summary: Update information about meetup
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - id
 *              properties:
 *                id:
 *                  type: integer
 *                theme:
 *                  type: string
 *                description:
 *                  type: string
 *                time:
 *                  type: string
 *                venue:
 *                  type: string
 *                tags:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        200:
 *          description: The meeting information has been successfully updated
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
