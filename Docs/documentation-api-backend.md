# Documentation API du Backend HandPi Games

## Base URL
`http://127.0.0.1:5001`

## Endpoints

### 1. Démarrer une nouvelle partie

- **URL** : `/api/game/start`
- **Méthode** : `POST`
- **Description** : Initialise une nouvelle partie du jeu ABCD.

#### Réponse

```json
{
  "message": "Game started",
  "current_letter": "A"
}
```

#### Codes de statut
- 200 OK : Partie démarrée avec succès
- 400 Bad Request : Une partie est déjà en cours

### 2. Vérifier un geste

- **URL** : `/api/game/check`
- **Méthode** : `GET`
- **Description** : Capture une image, reconnaît le geste, et vérifie s'il correspond à la lettre actuelle.

#### Réponse

```json
{
  "message": "Correct!" | "Incorrect, try again" | "Game ended",
  "new_letter": "B",
  "score": 1,
  "predicted_gesture": "A"
}
```

#### Codes de statut
- 200 OK : Geste vérifié avec succès
- 400 Bad Request : Aucune image disponible
- 500 Internal Server Error : Erreur lors du traitement de l'image

### 3. Terminer une partie

- **URL** : `/api/game/end`
- **Méthode** : `POST`
- **Description** : Termine la partie en cours et renvoie le score final.

#### Réponse

```json
{
  "message": "Game ended",
  "final_score": 4
}
```

#### Codes de statut
- 200 OK : Partie terminée avec succès
- 400 Bad Request : Aucune partie en cours

### 4. Flux vidéo

- **URL** : `/video_feed`
- **Méthode** : `GET`
- **Description** : Fournit un flux vidéo en temps réel de la caméra avec la reconnaissance de gestes.

#### Réponse
- Content-Type : `multipart/x-mixed-replace; boundary=frame`
- Corps : Flux d'images JPEG

## Utilisation de l'API

### Exemple avec Python et requests

```python
import requests

base_url = "http://127.0.0.1:5001"

# Démarrer une nouvelle partie
response = requests.post(f"{base_url}/api/game/start")
print(response.json())

# Vérifier un geste
response = requests.get(f"{base_url}/api/game/check")
print(response.json())

# Terminer la partie
response = requests.post(f"{base_url}/api/game/end")
print(response.json())
```

### Exemple avec JavaScript et Axios

```javascript
import axios from 'axios';

const baseURL = "http://127.0.0.1:5001";

// Démarrer une nouvelle partie
axios.post(`${baseURL}/api/game/start`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Vérifier un geste
axios.get(`${baseURL}/api/game/check`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Terminer la partie
axios.post(`${baseURL}/api/game/end`)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Notes importantes

1. Assurez-vous que le serveur backend est en cours d'exécution avant d'utiliser l'API.
2. La route `/api/game/check` capture automatiquement une image de la caméra côté serveur. Il n'est pas nécessaire d'envoyer une image depuis le client.
3. Le flux vidéo (`/video_feed`) est conçu pour être utilisé dans une balise `<img>` HTML ou similaire.
4. Pour une intégration mobile, vous devrez peut-être ajuster la logique de capture d'image côté client et envoyer l'image au serveur pour traitement.

Cette documentation devrait fournir toutes les informations nécessaires pour interagir avec l'API backend de HandPi Games, facilitant ainsi le développement futur et l'intégration avec d'autres plateformes.
