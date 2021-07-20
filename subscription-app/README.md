# GetSubscription

Your program will need to load these inputs, process them according to the rules under below,
and output a single file which contains the output from the analysis results.

The output should be focussed around each account. For each account,
we want to know the number of whole days (rounded down) the user has had free from each Partner.

The format of the JSON output file should match this structure:

```
{
  "subscriptions": {
    "Santosh": {
      "Partner1": 3,
      "Partner2": 6
    }
  }
}
```
