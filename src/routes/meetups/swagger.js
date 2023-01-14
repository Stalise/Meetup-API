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
 *        404:
 *          $ref: '#/components/responses/MeetupNotFound'
 *        500:
 *          $ref: '#/components/responses/UnexpectedError'
 */
//=============================================================================//
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
 *        404:
 *          $ref: '#/components/responses/MeetupNotFound'
 *        500:
 *          $ref: '#/components/responses/UnexpectedError'
 */
