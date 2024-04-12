using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

[RequireComponent(typeof(ARRaycastManager))]
public class SpawnOnPlane : MonoBehaviour
{
    //Declare Variables
    private ARRaycastManager m_RaycastManager;
    private GameObject spawnObject = null;
    private List<GameObject> spawnedObjs = new List<GameObject>(); //keeps a list of objects
    private int maxSpawnCount = 5; //a max of how many objexts can be spawned at once
    private int spawnCount = 0; // current count of spawned objects

    [SerializeField]
    public GameObject placePrefab;

    static List<ARRaycastHit> s_Hits = new List<ARRaycastHit>();

    //Awake is called whne the program runs
    void Awake()
    {
        m_RaycastManager = GetComponent<ARRaycastManager>();
    }

    bool tryGetTouchPos(out Vector2 pos)
    {
        if (Input.GetTouch(0).phase == TouchPhase.Began) //Ensures one prefab is loaded on touch
        {
            pos = Input.GetTouch(0).position;
            return true;
        }
        pos = default;
        return false;
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (!tryGetTouchPos(out Vector2 pos)) //checks for touch input
        {
            return; //breaks out of update function if there is no touch input
        }

        //Once we get passed return
        if (m_RaycastManager.Raycast(pos, s_Hits, TrackableType.PlaneWithinPolygon))
        {
            var hitPose = s_Hits[0].pose;
            if(spawnObject == null)
            {
                spawnPrefab(hitPose);
            }
            else
            {
                if(spawnCount < maxSpawnCount)
                {
                    spawnPrefab(hitPose);
                }
                //spawnObject.transform.position = hitPose.position;
                //spawnObject.transform.rotation = hitPose.rotation;
            }
        }
    }

    public void setPrefabType(GameObject prefab)
    {
        placePrefab = prefab;
    }

    private void spawnPrefab(Pose hitPose) //to get rid of repeated code
    {
        spawnObject = Instantiate(placePrefab, hitPose.position, hitPose.rotation);
        spawnedObjs.Add(spawnObject);
        spawnCount++;
    }
}
