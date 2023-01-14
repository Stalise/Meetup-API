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
 *        500:
 *          $ref: '#/components/responses/UnexpectedError'
 */
//=============================================================================//
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
//=============================================================================//
