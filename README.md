# find-candidate-keys
Finds the candidate keys from a list of functionnal dependencies

## Usage
```javascript
// R = (E, G, K, L)
var rel = ["E","G","K","L"];
// F = (E ⭢ G, EK ⭢ L)
var fundeps = [
  [["E"], "G"], // E ⭢ G
  [["E", "K"], "L"] // EK ⭢ L
];

candidate_keys(rel, fundeps);
/* Returns the list of all candidate keys (in this case, there is only EK)
[
  ["E", "K"]
]
*/
```
