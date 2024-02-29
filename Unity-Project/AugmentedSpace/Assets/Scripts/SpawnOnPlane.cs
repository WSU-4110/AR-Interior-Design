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

    [SerializeField]
    private GameObject placePrefab;

    static List<ARRaycastHit> s_Hits = new List<ARRaycastHit>();

    //Awake is called whne the program runs
    void Awake()
    {
        m_RaycastManager = GetComponent<ARRaycastManager>();
    }

    bool tryGetTouchPos(out Vector2 pos)
    {
        if (Input.touchCount > 0)
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
                spawnObject = Instantiate(placePrefab, hitPose.position, hitPose.rotation);
            }
            else
            {
                spawnObject.transform.position = hitPose.position;
                spawnObject.transform.rotation = hitPose.rotation;
            }
        }
    }
}
