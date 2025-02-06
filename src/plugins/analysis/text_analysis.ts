import { Plugin, PluginResult } from '@nova/types';
import { TextStatistics } from './statistics';
import { KeywordExtractor } from './keywords';
import { TopicClassifier } from './classifier';

export class TextAnalysisPlugin implements Plugin {
  private statistics: TextStatistics;
  private keywordExtractor: KeywordExtractor;
  private topicClassifier: TopicClassifier;

  constructor() {
    this.statistics = new TextStatistics();
    this.keywordExtractor = new KeywordExtractor();
    this.topicClassifier = new TopicClassifier();
  }

  async process(input: string): Promise<PluginResult> {
    const stats = await this.statistics.analyze(input);
    const keywords = await this.keywordExtractor.extract(input);
    const topics = await this.topicClassifier.classify(input);

    return {
      result: {
        readability: stats.readabilityScore,
        sentiment: stats.sentiment,
        keywords: keywords.slice(0, 5),
        mainTopic: topics[0],
        subTopics: topics.slice(1),
      },
      metadata: {
        processingTime: Date.now(),
        wordCount: stats.wordCount,
        complexity: stats.complexity,
      },
    };
  }
}