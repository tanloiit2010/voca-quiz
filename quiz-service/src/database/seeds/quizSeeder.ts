import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { QUESTION_TYPES, QUIZ_SESSION_STATUS } from 'src/core/quiz/types';
import { Quiz } from '../entities/quiz.entity';
import { QuizSession } from '../entities/quizSession.entity';

export default class QuizSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const quizRepository = dataSource.getRepository(Quiz);
    const quizSessionRepository = dataSource.getRepository(QuizSession);

    const quizzes = await quizRepository.find();

    if (quizzes.length === 0) {
      const quiz = await quizRepository.save({
        name: 'How Strong is Your Vocabulary?',
        description:
          'Take our 5 questions quiz to find out — and maybe learn some new words along the way.',
        status: 'in_progress',
        questions: [
          {
            content: 'Which word means exceedingly idealistic and unrealistic?',
            type: QUESTION_TYPES.SINGLE_CHOICE,
            displayOrder: 1,
            score: 200,
            questionOptions: [
              {
                content: 'Pragmatic',
                isCorrect: false,
                displayOrder: 1,
              },
              {
                content: 'Quixotic',
                isCorrect: true,
                displayOrder: 2,
              },
              {
                content: 'Sensible',
                isCorrect: false,
                displayOrder: 3,
              },
              {
                content: 'Practical',
                isCorrect: false,
                displayOrder: 4,
              },
            ],
          },
          {
            content: 'What does the term “ineffable” describe?',
            type: QUESTION_TYPES.SINGLE_CHOICE,
            displayOrder: 2,
            score: 200,
            questionOptions: [
              {
                content: 'Easily expressed',
                isCorrect: false,
                displayOrder: 1,
              },
              {
                content: 'Too great or extreme to be described in words',
                isCorrect: true,
                displayOrder: 2,
              },
              {
                content: 'Mundane',
                isCorrect: false,
                displayOrder: 3,
              },
              {
                content: 'Ordinary',
                isCorrect: false,
                displayOrder: 4,
              },
            ],
          },
          {
            content: 'What is a “sycophant”?',
            type: QUESTION_TYPES.SINGLE_CHOICE,
            displayOrder: 3,
            score: 200,
            questionOptions: [
              {
                content: 'A type of tree',
                isCorrect: false,
                displayOrder: 1,
              },
              {
                content: 'A loyal friend',
                isCorrect: false,
                displayOrder: 2,
              },
              {
                content: 'A person who acts obsequiously to gain advantage',
                isCorrect: true,
                displayOrder: 3,
              },
              {
                content: 'A skilled musician',
                isCorrect: false,
                displayOrder: 4,
              },
            ],
          },
          {
            content:
              'Which term describes something sweet-sounding and pleasant to the ear?',
            type: QUESTION_TYPES.SINGLE_CHOICE,
            displayOrder: 4,
            score: 200,
            questionOptions: [
              {
                content: 'Dissonant',
                isCorrect: false,
                displayOrder: 1,
              },
              {
                content: 'Jarring',
                isCorrect: false,
                displayOrder: 2,
              },
              {
                content: 'Mellifluous',
                isCorrect: true,
                displayOrder: 3,
              },
              {
                content: 'Grating',
                isCorrect: false,
                displayOrder: 4,
              },
            ],
          },
          {
            content: 'What does the word “ubiquitous” mean”',
            type: QUESTION_TYPES.SINGLE_CHOICE,
            displayOrder: 5,
            score: 200,
            questionOptions: [
              {
                content: 'Present in limited places',
                isCorrect: false,
                displayOrder: 1,
              },
              {
                content: 'Rarely seen',
                isCorrect: false,
                displayOrder: 2,
              },
              {
                content: 'Present or found everywhere',
                isCorrect: true,
                displayOrder: 3,
              },
              {
                content: 'Exclusively found in cities',
                isCorrect: false,
                displayOrder: 4,
              },
            ],
          },
        ],
      });

      await quizSessionRepository.save([
        {
          startedAt: new Date(),
          status: QUIZ_SESSION_STATUS.IN_PROGRESS,
          username: 'john.doe',
          score: 0,
          quiz: {
            id: quiz.id,
          },
        },
        {
          startedAt: new Date(),
          status: QUIZ_SESSION_STATUS.COMPLETED,
          username: 'dante.walsh',
          score: 800,
          quiz: {
            id: quiz.id,
          },
        },
        {
          startedAt: new Date(),
          status: QUIZ_SESSION_STATUS.COMPLETED,
          username: 'maria.duncan',
          score: 600,
          quiz: {
            id: quiz.id,
          },
        },
        {
          startedAt: new Date(),
          status: QUIZ_SESSION_STATUS.COMPLETED,
          username: 'luka.carter',
          score: 400,
          quiz: {
            id: quiz.id,
          },
        },
        {
          startedAt: new Date(),
          status: QUIZ_SESSION_STATUS.COMPLETED,
          username: 'kira.murphy',
          score: 200,
          quiz: {
            id: quiz.id,
          },
        },
      ]);
    }
  }
}
