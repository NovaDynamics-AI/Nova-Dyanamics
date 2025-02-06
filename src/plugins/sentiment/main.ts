import { Plugin, PluginResult } from '../../types';
import { SentimentAnalyzer } from './analyzer';

export class SentimentPlugin implements Plugin {
  private analyzer: SentimentAnalyzer;

  constructor() {
    this.analyzer = new SentimentAnalyzer();
  }

  async process(input: string): Promise<PluginResult> {
    const sentiment = await this.analyzer.analyze(input);
    return {
      result: sentiment.score.toString(),
      metadata: {
        positive: sentiment.positive,
        negative: sentiment.negative,
        neutral: sentiment.neutral,
      },
    };
  }
}
