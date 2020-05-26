import wikipedia
import sys

theme = " ".join(sys.argv[1:])

print(theme)

options = wikipedia.search(theme)

wikipedia.set_lang("pt")

for term in options:
    print(f"[{options.index(term)}] - {term}")

print()

choice = int(input("Selecione o termo correto da busca: "))

print()

steps = []

for i in range(1,11):
    step = wikipedia.summary(options[choice], sentences=i)
    steps.append(step)

newSteps = []

for i in range(1,10):
    newStep = steps[10-i].replace(steps[10-i-1], "")
    newStep = newStep.replace("\n", "")
    newSteps.append(newStep)

newSteps.append(steps[0])

newSteps = newSteps[::-1]

infoFile = "./INFO/info.txt"

with open(infoFile, 'w', encoding='utf-8') as file:
    for line in newSteps:
        file.write(line + "\n")
