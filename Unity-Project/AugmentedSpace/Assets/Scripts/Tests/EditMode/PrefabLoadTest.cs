using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

public class PrefabLoadTest
{
    public GameObject prefab1;
    public GameObject prefab1origin = GameObject.Find("3Seat3 Variant");
    public GameObject prefab2;
    public GameObject prefab2origin;
    // A Test behaves as an ordinary method
    [Test]
    public void setPrefabType()
    {
        Assert.AreSame(prefab1, prefab1origin);
       // prefab1origin = new GameObject().getComponent<SpawnOnPlane>().placePrefab;
        Assert.AreSame(prefab1, new SpawnOnPlane().placePrefab);
    }

    // A UnityTest behaves like a coroutine in Play Mode. In Edit Mode you can use
    // `yield return null;` to skip a frame.
    [UnityTest]
    public IEnumerator PrefabLoadTestWithEnumeratorPasses()
    {
        // Use the Assert class to test conditions.
        // Use yield to skip a frame.
        yield return null;
    }
}
