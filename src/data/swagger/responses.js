/**
 *@swagger
 *components:
 *  responses:
 *    UnexpectedError:
 *      description: Unexpected error on the server
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *            example:
 *              message: An unexpected error has occurred. Please tell us about this problem.
 *    MeetupNotFound:
 *      description: The meetup was not found by id
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *            example:
 *              message: Meetup is not exist.
 */
