/**
 *@swagger
 *  /meetups:
 *    post:
 *      summary: Create new meetup
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                - theme
 *                - description
 *                - time
 *                - venue
 *              properties:
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
 *        201:
 *          description: Successful creation of a meetup
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Meetup'
 *        400:
 *          $ref: '#/components/responses/Validation'
 *        500:
 *          $ref: '#/components/responses/UnexpectedError'
 */
