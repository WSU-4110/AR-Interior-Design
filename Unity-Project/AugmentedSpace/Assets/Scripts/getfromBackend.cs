using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using System.Linq;

public class getfromBackend : MonoBehaviour
{
    public string dataFile;
    List<string> data = new List<string>();
    // Start is called before the first frame update
    void Start()
    {
        data = File.ReadAllLines("C:\\Users\\detro\\Desktop\\Symphony.txt").ToList();
        //data = File.ReadAllLines("Internal storage\\Documents\\Augmented Space\\arview.json").ToList();
        pullFireBase();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void pullFireBase()
    {
        print("Fetching from FireBase");
        foreach(string line in data)
        {
            print(line);
        }
    }
}
