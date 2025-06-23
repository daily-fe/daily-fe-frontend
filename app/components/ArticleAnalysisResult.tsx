import type { AnalysisResult } from '@/domain/model/article';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DialogFooter } from './ui/dialog';

interface ArticleAnalysisResultProps {
	result: AnalysisResult;
	onReset: () => void;
	onAddToList: () => void;
}

export default function ArticleAnalysisResult({ result, onReset, onAddToList }: ArticleAnalysisResultProps) {
	return (
		<div>
			<h3 className="text-lg font-semibold">{result.title}</h3>
			<p className="mt-2 text-sm text-muted-foreground">{result.summary}</p>
			<div className="mt-4 flex flex-wrap gap-2">
				{result.tags.map((tag) => (
					<Badge key={tag} variant="secondary">
						{tag}
					</Badge>
				))}
			</div>
			<DialogFooter className="mt-6">
				<Button onClick={onReset}>다시 분석</Button>
				<Button onClick={onAddToList}>목록에 추가</Button>
			</DialogFooter>
		</div>
	);
}
