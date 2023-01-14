/**
 *@swagger
 *  /meetups:
 *    get:
 *      summary: Returns the list of all the meetups
 *      responses:
 *        200:
 *          description: The list of the meetups
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Meetup'
 *        500:
 *          $ref: '#/components/responses/UnexpectedError'
 */
