✅ Zusammenfassung
Ich habe 5 vollständige, ausführbare Module für Ihr PC Praxis-Projekt erstellt:

📦 Erstellte Module

01-setup-projeto-base.sh

Verzeichnisstruktur
Docker Compose
Makefile mit nützlichen Befehlen
Git initialisiert
Tag: v0.1-planning

02-setup-backend.sh

NestJS + TypeScript
Prisma ORM mit vollständigem Schema
Module: Auth, Users, Catalog, Orders, Tickets, Tracking
Mehrstufiges Dockerfile
Tag: v0.2-backend-core

03-setup-frontend.sh

Next.js 14 + React + TypeScript
Tailwind CSS mit dunkler Farbpalette
Konfigurierter API-Client
Komponentenstruktur
Tag: v0.5-frontend-admin

04-deploy-stack.sh

Automatische Bereitstellung (Entwicklung/Staging/Produktion)
Systemprüfungen
Nginx konfiguriert
SSL Bereit
Tag: v1.0-produktionsbereit

05-github-actions-setup.sh

Vollständige CI/CD
Automatisierte Tests
Automatisierte Bereitstellung
Tägliches Backup
Sicherheits-Scans

🎯 Funktionen
✅ Deutschland/Australien: Bereit für de-AT, EUR
✅ DSGVO-konform: Pseudonymisierte IP-Adresse, Einwilligungs-Tracking
✅ Bestellprotokoll: Format PCP-JJJJMMTT-0001
✅ Wartungstickets: Format SRV-JJJJMMTT-0001
✅ PC-Konfigurator: Komponentensystem mit Kompatibilitätsprüfung
✅ Versandkosten: Berechnung in Bestellungen integriert
✅ Analysen: Plausibles Self-Hosting, Datenschutz an erster Stelle
✅ Kostenlose Tools: 100 % Open-Source-Stack
✅ Wiederherstellungspunkte: Git-Tags in jeder Phase
🚀 Verwendung
bash# 1. Basiseinrichtung
bash 01-setup-projeto-base.sh

# 2. Backend
bash 02-setup-backend.sh cd backend && npx prisma migrate dev --name init && cd ..

# 3. Frontend
bash 03-setup-frontend.sh

# 4. Alles bereitstellen
bash 04-deploy-stack.sh
# Auswahl: 1) Entwicklung

# 5. CI/CD (optional)
bash 05-github-actions-setup.sh

📍 Lokaler Zugriff

Frontend: http://localhost:3000
Backend: http://localhost:4000
API-Dokumentation: http://localhost:4000/api/docs
Plausible: http://localhost:8000
Datenbank: localhost:5432

🏷️ Tags Wiederherstellung
Jede Phase hat einen Git-Tag, sodass Sie die vorherige Phase wiederherstellen können: bash git checkout v0.2-backend-core # Backend bereit
git checkout v0.5-frontend-admin # Vollständige Benutzeroberfläche
git checkout v1.0-production-ready # Produktionsbereit

# PCPraxis

# PC Praxis Plattform

Vollständige Plattform für das Unternehmen **PC Praxis (Pedro Hauser)** mit folgenden Schwerpunkten:

- Institutionelle und kommerzielle Website;

- Shop + PC-Konfigurator;

- Service- und Produktkatalog;

- Tickets mit Protokollnummern für:

- Käufe/Bestellungen;

- Wartungsdienste;

- Versand, Lieferungen und zugehörige Gebühren;

- Backend für Authentifizierung, Lead- und Event-Tracking;

- Technologie-Stack basierend auf freien/Open-Source-Tools.

---

## 1. Technologie-Stack (frei/Open Source)

### 1.1. Frontend

- **Next.js + React + TypeScript** – Kostenloses Full-Stack-Framework mit Fokus auf Performance und SEO.

- **TailwindCSS** – Leichtgewichtiges und flexibles Open-Source-CSS-Tool.

- **Radix / Headless UI (optional)** – Barrierefreie Komponenten.

### 1.2. Backend

- **Node.js + NestJS oder Express** – Kostenlose und weit verbreitete Laufzeitumgebung und Framework.

- **TypeScript** – Statische Typisierung für höhere Sicherheit.

- **Prisma oder TypeORM** – Kostenloses ORM für PostgreSQL.

### 1.3. Datenbank

- **PostgreSQL** – Robuste, branchenübliche Open-Source-Datenbank.

### 1.4. Observability, Logs und Analytics

- Logs werden gemäß den 12-Faktor-App-Prinzipien als **Event-Streams** behandelt.

- Webanalyse:

- **Plausible CE** (selbstgehostet) – Open Source, ressourcenschonend, datenschutzorientiert, DSGVO-konform, ohne Cookies.

- Alternative: **Matomo** (selbstgehostet, ebenfalls Open Source und DSGVO-konform).

### 1.5 Infrastruktur & Bereitstellung

- **Docker + Docker Compose** – Frontend-, Backend- und Datenbankpaketierung.

- **Nginx oder Traefik** – Reverse-Proxy und TLS.

- **GitHub + GitHub Actions** – kostenlose CI/CD mit automatisiertem Build, Test und Deployment.

---

## 2. Geschäftsbereiche

### 2.1 Katalog

- **Services** (Wartung, Einrichtung, Beratung).

- **Produkte** (Komplett-PCs, Komponenten, Zubehör).

- Links zu:

- PC-Konfigurator (konfigurierbare Komponenten);

- Wartungstickets (Vertragsleistungen);

- Bestellungen (verkaufte Produkte).

### 2.2. Bestellungen und Protokoll

Für jede Bestellung wird ein **Bestellschein** mit einer eindeutigen Protokollnummer (`order_protocol`) generiert. Dieser dient folgenden Zwecken:

- Nachverfolgung des Bestellstatus;

- Referenzierung von E-Mails, Rechnungen und Kundenservice.

Hauptbestellfelder:

- `order_id` (UUID);

- `order_protocol` (z. B. `PCP-YYYYMMDD-0001`);

- `customer_id` / `visitor_id`;

- Artikel (Produkte/Dienstleistungen);

- Versandkosten, Gebühren, Rabatte;

- Status (`pending`, `paid`, `in_preparation`, `shipped`, `delivered`, `crusted`);

- Zeitstempel für jeden Bearbeitungsschritt.

### 2.3. Wartungs-/Servicetickets

Jeder Wartungsservice erstellt ein **Serviceticket** mit eigenem Protokoll:

- `service_ticket_id` (UUID);

- `service_protocol` (z. B. `SRV-YYYYMMDD-0001`);

- Kunde, Gerät, Symptome, Priorität;

- Link zu Produkten/Services im Katalog;

- Status (`geöffnet`, `Diagnose läuft`, `wartet auf Kunden`, `in Reparatur`, `bereit`, `abgeschlossen`).

### 2.4. Versand, Lieferung und Gebühren

Wird wie folgt behandelt:
