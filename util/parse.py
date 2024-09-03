import json

in_file = 'intro.txt'
out_file = 'sentences.json'

contents = open(in_file, 'r')
text = contents.read()
sents = text.split('。')
sentences = []

for s in sents:
	sent = s.replace('\n', '')
	sentences.append(sent)

print(sentences[1])

with open(out_file, 'w', encoding='utf-8') as f:
	json.dump(sentences, f, ensure_ascii=False, indent=4)

