# Readme
This folder contains the state of the DataCamp mobile app as it was released right after the retreat.

Right now, it is a pretty informal notation to be able to express freely.

# Questiosn:
- How do we specify the context and question type? With a type system or using concepts?
  - It seems concepts gives us the most freedom
- At what abstraction level live screens? Is this one of the concepts, or is this a lower level abstracion?
- What is the difference between concepts and the data model?
  - It seems that it comes down right now in having more freedom in types.
  - Can you show some differences between a data model element and a concept?
    - We don't have to care about tables in concepts. E.g. we don't care about user_tracks when talking about concepts
      - It seems that all 'linking' tables that have extra fields are interesting though. Like workout_exercises.
    - We don't care about id's in concepts
- How will we add the content guidelines?
- What is the advantage of doing this?
  - Being able to have a red thread between all things that have to do with an application: The code, the functional specs, the DataBase documentation, the API documentation... This makes it really easy to navigate.