/**
 *@swagger
 *components:
 *  schemas:
 *    Meetup:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Meetup ID in the database
 *        theme:
 *          type: string
 *          description: The theme of the meetup
 *        description:
 *          type: string
 *          description: Description of the meetup
 *        time:
 *          type: string
 *          description: Meetup time
 *        venue:
 *          type: string
 *          description: Place of the meetup
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *      example:
 *        id: 1
 *        theme: Holy JS
 *        description: About the latest development trends and technologies in web development
 *        time: 2023-01-14T10:06:31.872Z
 *        venue: Bersenevskaya nab., 6, p. 3, Moscow (floor 4)
 *        tags: [js, web, frontend]
 */
