<p align="center">
  <img src="./src/favicon.ico" alt="Size Limit CLI" width="80">
</p>

# Eventlogs

Das vorliegende Projekt Eventlogs ist im Rahmen des **Fachpraktikum 63681 Programmiersysteme** an der [Fernuniversität Hagen](https://www.fernuni-hagen.de/) entstanden. Die Betreuung im Fachpraktikum erfolgt durch Robin Bergenthum und Jakub Kovar.

Die Funktionalität der Anwendung ist das Anzeigen und Bearbeiten von Eventlogs. Hierzu bietet die Anwendung einen .xes und .log Import sowie Export. Die eingelesenen Logs können dann in der Darstellungsform einer Wertschöpfungskette und eines Direkt-Folge-Graphs angezeigt werden. Zudem verfügt die Anwendung über Editor Funktionalitäten um das geladene Eventlog bearbeiten zu können.

## Aufsetzen des Projekts

### Einrichtung des lokalen Workspace

Nutze hierzu den [SetUp-Local-Guide](https://angular.io/guide/setup-local) von Angular.

### Klone das vorliegende [Repository](https://github.com/eventlogs/event_logs)

```bash
git clone https://github.com/eventlogs/event_logs.git
```

### Installiere alle Abhängigkeiten 

Dies sind lediglich alle `npm` Pakete aus der `package.json`.

```bash
npm install
```

### Ausführen des Projekts

Ausführen der Unit-Test

```bash
npm run test 
```

Ausführen des Angular-Test-Servers zur lokalen Bereitstellung der Angular-Anwendung

```bash
npm run start 
```

### Weitere nützliche Befehle

Weitere nützliche Befehle, die in der `package.json` definiert wurden:

* `npm run build` - führt den TypeScript-Compiler und den Asset-Kopierer einmalig aus.
* `npm run watch` - führt den TypeScript-Compiler und den Asset-Kopierer im „Überwachungsmodus“ aus; Wenn Änderungen an den Quelldateien vorgenommen werden, werden sie neu kompiliert oder nach `dist/` kopiert.
* `npm run lint` - führt das konfigurierte linting aus.
* `npm run format` - führt das konfigurierte linting aus und behebt alle automatisiert lösbaren Mängel.

## Beitragen

Nach dem Aufsetzen des Projekts kannst Du eigene Anpassungen vornehmen und diese lokal testen. 

Damit diese in den Master aufgenommen werden, committe die Änderungen zunächst in einen neuen Feature-Branch. Bevor ein Merge-Request erstellt wird, sollte das konfigurierte Linting durchgeführt werden. Alle gefundenen Findings müssen behoben werden. (siehe oben zur Ausführung des Lintings)

Zum Beitragen der Änderungen in den Master-Branch werden Pull-Request auf GitHub genutzt. Das Projekt wurde entsprechend konfiguriert, dass ein Review vorab eines Merges notwendig ist. Hierdurch soll gewährleistet werden, dass das 4-Augen-Prinzip eingehalten wird.

## CI/CD

Auf allen Branches werden automatisiert nach einem Commit über GitHub-Actions alle Unit-Tests ausgeführt. Daraufhin findet ein Build des Angular-Projekts statt. Diese Pipeline sollte vor der Erstellung eines Merge Requests deshalb erfolgreich durchlaufen werden.

Auf dem Master-Branch findet zudem eine Bereitstellung des Projekts durch ein Deployment auf GitHub-Pages statt. Der Branch `gh-pages` wird als Abbild des Pages-Deployments genutzt. Der aktuelle Master-Branch der Anwendung steht deshalb dauerhaft unter [https://eventlogs.github.io/event_logs/index.html](https://eventlogs.github.io/event_logs/index.html) zur Verfügung.

## Sonstige Werkzeuge zur Projektorganisation

* Discord (Einladung auf Anfrage)
* [GitHub](https://github.com/eventlogs/event_logs)
* [Jira](https://eventlogs.atlassian.net/)
