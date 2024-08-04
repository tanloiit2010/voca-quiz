import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { UserAnswer } from './userAnswer.entity';

@Entity({ name: 'quiz_sessions' })
export class QuizSession {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'started_at' })
  startedAt: Date;

  @Column()
  status: string;

  @Column()
  score: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizSessions)
  public quiz: Quiz;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.quizSession)
  public userAnswers: UserAnswer[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate?: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate?: Date;
}
